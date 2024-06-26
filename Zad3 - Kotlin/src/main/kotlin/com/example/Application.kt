package com.example

import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.entity.channel.TextChannel
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class MessageRequest(val message: String)

suspend fun main() {
    val dotenv = dotenv()
    val kord = Kord(dotenv().get("TOKEN"))
    val channelId =dotenv.get("CHANNEL")

    embeddedServer(Netty, port = 3000, host = "0.0.0.0") {
        messageSenderModule(kord, channelId)
    }.start(wait = true)

    kord.login()
}

fun Application.messageSenderModule(kord: Kord, channelId: String) {
    routing {
        post("/send") {
            val message = call.receive<String>()
            kord.rest.channel.createMessage(Snowflake(channelId)) {
                content = message
            }
            call.respond("Message was sent to channel with id $channelId.")
        }
    }
}