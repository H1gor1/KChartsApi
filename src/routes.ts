import { dailyChart } from "./routes/melonChart/dailyChart"
import { app } from "./server"

export const routes = async() => {
    app.register(dailyChart)
}