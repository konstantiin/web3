package beans

import java.io.Serializable
import java.util.*
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Named


@Named

@ApplicationScoped
class ResultsBean: Serializable{
    private var b: ReqBean= ReqBean()
    fun addReq(r: ReqBean){
        b = r;
    }
    fun getAll(): List<ReqBean>{
        val l = ArrayList<ReqBean>()
        l.add(b)
        return l
    }

}