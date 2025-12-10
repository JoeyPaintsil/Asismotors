import './TrustBar.scss';

const TrustBar = () => (
  <section className="trust-bar section">
    <div className="container trust-bar__inner">
      <p>
        Our customers say <strong>Excellent</strong>
      </p>
      <div className="trust-bar__stars">
        {[...Array(5)].map((_, idx) => (
          <span key={idx}>★</span>
        ))}
        <span className="trust-bar__rating">5/5</span>
      </div>
      <div className="trust-bar__badges">
        <a
          href="https://www.google.com/search?sca_esv=d44b221d688bac1f&rlz=1CDGOYI_enUS1035US1035&hl=en-US&sxsrf=AE3TifOsoiXb2Q0EtfyQQ38_lh0dh2C8-w:1765392262584&q=sark+auto+reviews&uds=AOm0WdH8L6TBJkB3niYpXxjfJcqYXB-cubmi_f3YTvDpoQcN3mmGg1xdLYMYvcW7nY5Yk3f1IoKaf5sQCc05TnGbBeeTGoL5YFA_61Xf0UV2iYdGhf-Q0wFpzcVwlN5JSa9VuIVKUQGurt5UP8jm1eUkMEi8gDBlGRGZOqi6cjFHq46i29JQU_3-OADNgOm_jVAjkZJ7k85g5eSCJo5JEQ_92XLftR8QCYc5wnVchW-SGMEv0f1NHw8xiKhqsIaO-HIN6d9DtMduUY-2BMtJd0x1DlEq9C8wxNF2vhPiiKV2jej5GwWCnFAP49sf5rPWB5IgU7gNfsi-fCcpPHSjiK6sk9wuGEORTPnh8-SY-uS6LB1V9Pq4c5kCMPefOeYyWJ3AGp6dEgbnOZI3KjL4HtY3XjVj08VX9-331t5G7WL49woKcUjFVsM1GXAxmqVcsHfGPF8lRtyDZd5wrUj02ZfWwBNm8aQSQlZkZmCAXvB2Kt5N66o5EzFfgdYHPC4yiQPMF4peh7E2&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3za0mLIt64e-jBoipxTZA2lxXr5ujiLVxqo6jq9BvimphJUWez-8CZhqzyQpU5u4fpjL-SQ858MWk6XTM_SDDALcgWO&sa=X&ved=2ahUKEwiVh83V1rORAxUQmGoFHahQN8YQk8gLegQIHRAB&ictx=1&stq=1&cs=0&lei=hr85aZWsI5CwqtsPqKHdsQw#ebo=3"
          target="_blank"
          rel="noreferrer"
          className="trust-bar__google"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            width="16"
            height="16"
          />
          <span>Google Reviews</span>
        </a>
      </div>
      <p className="trust-bar__pill">Secure · Reliable · Trusted</p>
    </div>
  </section>
);

export default TrustBar;

