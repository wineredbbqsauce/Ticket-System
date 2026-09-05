import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

fun main() {
    embeddedServer(Netty, port = 8080, host="0.0.0.0") {
        routing{
            get("/") {
                call.respondText("Ticket backend lever")
            }
        }
    }.start(wait = true)
}