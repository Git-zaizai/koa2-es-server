import axios from "axios";

axios.interceptors.response(response => {
    if (response.status == 200) {
        console.log('resuest ===> 请求响应：', response)
        response = response.data;
    }
    return response;
})

