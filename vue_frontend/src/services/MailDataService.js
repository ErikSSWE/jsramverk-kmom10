import http from "../http-common";

class MailDataService {
  /*
    create(data) {
    return http.post("/auth/signup", data);
  }
  */

    sendMail(data) {
        return http.post("/mail/signup", data);
    }
}

export default new MailDataService();
