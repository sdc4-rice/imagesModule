import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  rps: 6000,
  duration: "60s"
};

export default function() {
  let res = http.get("http://localhost:3003/?id=9999994");
  check(res, {
    "status was 200": (r) => r.status == 200
  });
};
