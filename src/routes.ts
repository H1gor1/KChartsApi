import { getFlo } from "./routes/FloChart/getFlo"
import { getGenie } from "./routes/genieChart/getGenie"
import { getMelon } from "./routes/melonChart/getMelon"
import { getVibe } from "./routes/vibeChart/getVibe"
import { app } from "./server"

export const routes = async() => {
    app.register(getMelon)
    app.register(getFlo)
    app.register(getGenie)
    app.register(getVibe)
}