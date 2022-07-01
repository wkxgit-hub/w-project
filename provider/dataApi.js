var api = require("api.js"), app = getApp();

function login(e) {
    return api.post("login", e);
}

function userinfo(e) {
    return api.post("Setuserinfo", e);
}

function indexData(e) {
    return api.post("Index", e);
}

function uploadImage(e) {
    return api.post("UploadImage", e);
}

function updateHeadimg(e) {
    return api.post("UpdateHeadimg", e);
}

function readNotice(e) {
    return api.post("Readnotice", e);
}

function article(e) {
    return api.post("Article", e);
}

function readVideo(e) {
    return api.post("Readvideo", e);
}

function medal(e) {
    return api.post("Medal", e);
}

function giftList(e) {
    return api.post("GiftList", e);
}

function exchangeGift(e) {
    return api.post("ExchangeGift", e);
}

function exchangeGiftList(e) {
    return api.post("ExchangeGiftList", e);
}

function aboutus(e) {
    return api.post("Aboutus", e);
}

function mockExam(e) {
    return api.post("Mockexam", e);
}

function preExamInfo(e) {
    return api.post("PreExamInfo", e);
}

function getExamList(e) {
    return api.post("GetExamList", e);
}

function sequence(e) {
    return api.post("Sequence", e);
}

function totalqNum(e) {
    return api.post("TotalqNum", e);
}

function mockexam_submit(e) {
    return api.post("Mockexam_submit", e);
}

function getAchievement(e) {
    return api.post("GetAchievement", e);
}

function addWrong(e) {
    return api.post("AddWrong", e);
}

function share(e) {
    return api.post("Share", e);
}

function feedback(e) {
    return api.post("Feedback", e);
}

function sequence_submit(e) {
    return api.post("Sequence_submit", e);
}

function myerrList(e) {
    return api.post("MyerrList", e);
}

function atype(e) {
    return api.post("Atype", e);
}

function advert(e) {
    return api.post("Advert", e);
}

function knowledge(e) {
    return api.post("Knowledge", e);
}

function setCDKey(e) {
    return api.post("SetCDKey", e);
}

function wxPay(e) {
    return api.post("WxPay", e);
}

function getFormid(e) {
    return api.post("GetFormid", e);
}

function special(e) {
    return api.post("Special", e);
}

module.exports = {
    login: login,
    userinfo: userinfo,
    uploadImage: uploadImage,
    updateHeadimg: updateHeadimg,
    indexData: indexData,
    readNotice: readNotice,
    article: article,
    readVideo: readVideo,
    medal: medal,
    giftList: giftList,
    exchangeGift: exchangeGift,
    exchangeGiftList: exchangeGiftList,
    aboutus: aboutus,
    mockExam: mockExam,
    preExamInfo: preExamInfo,
    getExamList: getExamList,
    sequence: sequence,
    totalqNum: totalqNum,
    mockexam_submit: mockexam_submit,
    getAchievement: getAchievement,
    special: special,
    addWrong: addWrong,
    share: share,
    feedback: feedback,
    sequence_submit: sequence_submit,
    myerrList: myerrList,
    atype: atype,
    advert: advert,
    knowledge: knowledge,
    setCDKey: setCDKey,
    wxPay: wxPay,
    getFormid: getFormid
};