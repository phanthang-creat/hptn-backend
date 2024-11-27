import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const url = "https://ptit.dtpro.click/api/auth/login";

    const payload = JSON.stringify({
        "username": "panochess",
        "password": "PanoChess.2023#"
      });

    const headers = {
        'Content-Type': 'application/json',
    };

    const res = http.post(url, payload, { headers });

    if (res.status === 200 || res.status === 201) {
        console.log('Đăng nhập thành công!');
    } else {
        console.error('Đăng nhập không thành công. Mã lỗi:', res.status);
    }

    sleep(1);
}

export function handleSummary(data) {
    return {
        "/performace_testing_script/summary-be.html": htmlReport(data),
    };
}

