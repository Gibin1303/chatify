import { Resend } from "resend";
import { ENV } from "./env.js";


export const resendClient = new Resend(ENV.RESEND_API);


export const sender = {
    email: ENV.RESEND_EMAIL,
    name: ENV.EMAIL_FROM_NAME,
}

