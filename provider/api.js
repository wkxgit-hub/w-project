var app = getApp(), urlConfig = {
    api: "entry/wxapp/",
    m: "goouc_fullexam"
};

function apiPost(t, u) {
    return new Promise(function(a, o) {
        u || (u = {}), u.m = urlConfig.m, app.util.request({
            url: urlConfig.api + t,
            data: u,
            method: "post",
            header: {},
            success: function(t) {
                a(t.data);
            },
            fail: function(t) {
                o(t.data);
            }
        });
    });
}

module.exports = {
    post: apiPost
};