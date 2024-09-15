import { dailyChart } from "./routes/melonChart/dailyChart"
import { getMelon } from "./routes/melonChart/getMelon"
import { app } from "./server"

export const routes = async() => {
    app.register(getMelon)
}