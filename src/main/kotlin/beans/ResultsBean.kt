package beans

import jakarta.enterprise.context.ApplicationScoped
import jakarta.faces.context.FacesContext
import jakarta.inject.Named
import jakarta.servlet.http.HttpSession
import java.io.Serializable
import java.sql.Connection
import java.sql.DriverManager
import java.util.*
import java.util.logging.Logger
import kotlin.collections.ArrayList
import kotlin.math.log

@Named
@ApplicationScoped
class ResultsBean: Serializable{
    private var isConnected: Boolean = false
    private lateinit var Db: Connection
    private var logger: Logger = Logger.getLogger(ResultsBean::class.java.getName())
    private var resultList: List<ReqBean> = ArrayList<ReqBean>()
    fun getResultList(): List<ReqBean>{
        if (resultList.size > 20){
            resultList = resultList.drop(1)

        }
        return resultList
    }
    private fun connect(){
        isConnected = true
        Class.forName("org.postgresql.Driver");
        Db = DriverManager.getConnection(
            "jdbc:postgresql://localhost:5432/web",
            "367363",
            "pass"
        )// cringe ofk need to be changed
    }
    fun addReq(r: ReqBean){
        if (!isConnected)
            connect()
        val fCtx = FacesContext.getCurrentInstance()
        val session = fCtx.externalContext.getSession(false) as HttpSession
        val sessionId = session.id
        val query = "insert into checks (session_id, x, y, r) values(?, ?, ?, ?);"
        val statement = Db.prepareStatement(query)
        statement.setString(1, sessionId)
        statement.setDouble(2, r.getX())
        statement.setDouble(3, r.getY())
        statement.setDouble(4, r.getR())
        statement.executeUpdate()
        resultList = getAll()
    }

    private fun getAll(): List<ReqBean>{
        if (!isConnected)
            connect()
        val fCtx = FacesContext.getCurrentInstance()
        val session = fCtx.externalContext.getSession(false) as HttpSession
        val sessionId = session.id
        val query = "select x, y, r from checks where session_id = \'${sessionId}\';"
        logger.info(query)
        logger.info("session $sessionId")
        val allReq = Db.prepareStatement(query).executeQuery()
        val list = ArrayList<ReqBean>()
        while (allReq.next()){
            val next: ReqBean = ReqBean()
            next.setX(allReq.getDouble("x"))
            next.setY(allReq.getDouble("y"))
            next.setR(allReq.getDouble("r"))
            list.add(next)
        }

        return list
    }

}