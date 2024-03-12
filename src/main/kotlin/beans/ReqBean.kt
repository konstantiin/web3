package beans


import java.io.Serializable
import java.util.*
import jakarta.enterprise.context.SessionScoped
import jakarta.inject.Named


@Named

@SessionScoped
class ReqBean : Serializable {
    private var x: Double = 0.0
    private var y: Double = 0.0
    private var r: Double = 0.0
    fun setX(xx: Double){
        x = xx;
    }
    fun setY(yy: Double){
        y = yy;
    }
    fun setR(rr: Double){
        r = rr;
    }
    fun getX():Double{
        return x;
    }
    fun getY(): Double{
        return y
    }
    fun getR():Double{
        return r
    }
    fun isInside():Boolean{
        return inFirstQuarter() ||
                inSecondQuarter() ||
                inThirdQuarter()||
                inForthQuarter()
    }
    private fun inFirstQuarter(): Boolean{
        return x >= 0 && y >= 0 && y <= -x + r;
    }
    private fun inSecondQuarter(): Boolean{
        return x <= 0 && y >= 0 && y <= r/2 && x >= -r
    }
    private fun inThirdQuarter(): Boolean{
        return x <=0 && y <= 0 && x*x + y*y <= r
    }
    private fun inForthQuarter(): Boolean{
        return false;
    }
    override fun hashCode(): Int {
        return Objects.hash(x, y, r)
    }
    override fun toString(): String {
        return "PointBean{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isInArea=" +
                '}'
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ReqBean

        if (x != other.x) return false
        if (y != other.y) return false
        if (r != other.r) return false

        return true
    }
}