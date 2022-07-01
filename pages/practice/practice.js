var startX, startY, endX, endY //检测左右划动
var touch_pd = 1 //触摸判断(使能)
var sz_rl = 1 //第二行按钮显示控制
var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
};
function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js"), WxParse = require("../../wxParse/wxParse.js");

Page({
    data: {
		current_page: '',
		data_total:0,
        special_id: "",
        isAnalysisAudioPlay: 1,
        answerAudiolist: [],
        answerImglist: [],
        isfirstPlay: !0,
        have: 1,
        type: 1,
        startPoint: [ 0, 0 ],
        curPoint: [],
        statusBarHeight: "",
        titleBarHeight: "",
        show: !1,
        num: 0,
        num_length: 0,
        remainder: 0,
        handpapershow: !1,
        item: {
            total_score: 100,
            pass_score: 60,
            paper_time: 90,
            highest: 0
        },
        timer: null,
        ruletime: "",
        durationtime: "",
        usetime: "",
        index: 0,
        paperdetail: "",
        answerlist: [],
        audiolist: [],
        answerlength: 0,
        isaudio: 1,
        inputHeight: 0,
        rightAnswer: [],
        isloading: !1,
        adInfo: {},
        ad_have: 2
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.paperdetail[this.data.index].qimage;
        wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    previewImgJx: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.paperdetail[this.data.index].aimage;
        wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    mytouchstart: function(t) {
        this.setData({
            startPoint: [ t.touches[0].pageX, t.touches[0].pageY ]
        });
    },
    mytouchmove: function(t) {
        var a = [ t.touches[0].pageX, t.touches[0].pageY ];
        this.setData({
            curPoint: a
        });
    },
    mytouchend: function(t) {
        var a = [ t.changedTouches[0].pageX, t.changedTouches[0].pageY ], e = this.data.startPoint;
        a[0] - e[0] < 0 ? this.data.index + 1 < this.data.paperdetail.length && this.setData({
            index: this.data.index + 1
        }) : 0 < this.data.index && this.setData({
            index: this.data.index - 1
        });
    },
    goType: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            type: a
        });
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight
        });
        var a = app.globalData.op;
        if (app.globalData.id) {
            var e = app.globalData.id;
            this.mockExam(a, e), this.setData({
                special_id: e
            });
        } else {
            this.mockExam(a, "");
        }
        this.queryAd();
    },
    queryAd: function() {
        var a = this;
        dataApi.advert({
            op: "second"
        }).then(function(t) {
            a.setData({
                adInfo: t.data.info,
                ad_have: t.data.ad_have
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    goBack: function() {
        2 != this.data.have && this.changepic(this.data.index), wx.navigateBack({
            delta: 1
        });
    },
    showTk: function() {
        if (100 < this.data.paperdetail) {
            var t = Math.floor(this.data.paperdetail.length / 100), a = this.data.paperdetail.length % 100;
            console.log(t, a), this.setData({
                num: 100,
                num_length: t,
                remainder: a
            });
        } else this.setData({
            num: this.data.paperdetail
        });
        this.setData({
            show: !0
        });
    },
    onClose: function() {
        this.setData({
            show: !1
        });
    },

    touchStart(e) { //触摸开始
        startX = e.changedTouches[0].clientX
        startY = e.changedTouches[0].clientY
      },
      touchEnd(e) { //触摸结束
        if (touch_pd === 1) {
          var that = this
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          if (endX - startX < -50 && Math.abs(endY - startY) < 50) { //右滑，下一题
            if (sz_rl === 1) {
              that.goDown()
            }
          } else if (endX - startX  > 50 && Math.abs(endY - startY) < 50) { //左滑，上一题
            if (sz_rl === 1) {
              that.goUp() 
            }
          }
        }
      },
    goUp: function() {
        if (0 == this.data.index && this.data.current_page==0){
			wx.showToast({
			    title: "当前已是第一题",
			    icon: "none"
			})
			return
		};
		if (0 == this.data.index && this.data.current_page>0){
			this.setData({
				index:99,
				current_page:this.data.current_page*1-1
			});
			var a = app.globalData.op;
			var e = app.globalData.id;
			this.mockExam(a, e,true);
			return
		};
        this.setData({
            index: this.data.index - 1
        }), this.data.type;
        var t = "answerlist[" + (this.data.index + 1) + "].isanalysis";
        this.setData(_defineProperty({}, t, !1)), this.changepic(this.data.index);
    },
    goDown:function  () {
        if (this.data.current_page*100+this.data.index + 1 >= this.data.data_total) return wx.showToast({
            title: "已做完所有习题",
            icon: "none"
        }), !1;
		if (this.data.index==this.data.paperdetail.length-1) {
			this.setData({
				index:0,
				current_page:this.data.current_page*1+1
			});
			
			var a = app.globalData.op;
			var e = app.globalData.id;
			this.mockExam(a, e,true);
		} else {
			this.setData({
			    index: this.data.index + 1
			}), this.data.type;
			var t = "answerlist[" + (this.data.index - 1) + "].isanalysis";
			this.setData(_defineProperty({}, t, !1)), this.changepic(this.data.index);
		}
    },
    goShenq: function() {
        wx.navigateTo({
            url: '/pages/feedback/feedback'
            })
    },
    jumptap: function(t) {
		console.log(t.currentTarget);
        this.setData({
            index: t.currentTarget.dataset.i,
            show: !1
        }), this.changepic(this.data.index);
    },
    scrolltolower: function(t) {
        this.data.num < this.data.paperdetail.length && (Math.floor(this.data.num / 100) == this.data.num_length ? this.setData({
            num: this.data.num + this.data.remainder
        }) : this.setData({
            num: this.data.num + 100
        }));
		
    },
    addWrong: function() {
        var e = this;
        dataApi.addWrong({
            uid: wx.getStorageSync("uid"),
            tid: this.data.paperdetail[this.data.index].id,
            test_type: this.data.paperdetail[this.data.index].type,
            wrong_have: this.data.paperdetail[this.data.index].wrong_have
        }).then(function(t) {
            console.log(t), e.data.paperdetail;
            var a = "paperdetail[" + e.data.index + "].wrong_have";
            1 == t.data ? (wx.showToast({
                title: "已加入收藏",
                icon: "none"
            }), e.setData(_defineProperty({}, a, 1))) : (wx.showToast({
                title: "已移出收藏",
                icon: "none"
            }), e.setData(_defineProperty({}, a, 2)));
        }).catch(function(t) {
            console.log(t);
        });
    },
    choice: function(t) {
        var a = t.currentTarget.dataset.fjtit, e = t.currentTarget.dataset.option, i = (t.currentTarget.dataset.item, 
        this.data.answerlist), s = 0;
        i[a].choose = e, i.forEach(function(t) {
            2 == t.type ? t.flag && s++ : 4 == t.type ? t.issure && s++ : 5 == t.type ? t.iscomplete && s++ : t.choose && s++;
        }), this.setData({
            answerlist: i,
            answerlength: s
        }), this.judge(this.data.index), this.recordAnswer();
    },
    multipleChoice: function(t) {
        var a = t.currentTarget.dataset.fjtit, e = t.currentTarget.dataset.option, i = (t.currentTarget.dataset.item, 
        this.data.answerlist), s = 0, n = 0;
        i[a].choose.forEach(function(t, a) {
            t.o == e && (t.ischoose ? t.ischoose = !1 : t.ischoose = !0);
        });
        for (var o = 0; o < i[a].choose.length; o++) {
            if (i[a].choose[o].ischoose) {
                s = 1, i[a].flag = !1;
                break;
            }
            s = 0, i[a].flag = !1;
        }
        i.forEach(function(t) {
            2 == t.type ? t.flag && n++ : 4 == t.type ? t.issure && n++ : 5 == t.type ? t.iscomplete && n++ : t.choose && n++;
        }), i[a].flag = 1 == s, this.setData({
            answerlength: n + s,
            answerlist: i
        });
    },
    gomultipleChoice: function(t) {
        var a = t.currentTarget.dataset.fjtit, e = this.data.answerlist, i = t.currentTarget.dataset.item, s = [];
        e[a].choose.forEach(function(t) {
            t.ischoose && s.push(t.o);
        }), (s = s.join(",")) == i.rightkey && (e[a].isright = !0), 0 < s.length ? (e[a].issure = !0, 
        i.rightkey = i.rightkey.split(","), e[a].choose.forEach(function(t) {
            t.ischoose ? -1 != i.rightkey.indexOf(t.o) ? t.ischooseright = 1 : -1 == i.rightkey.indexOf(t.o) && (t.ischooseright = 2) : -1 != i.rightkey.indexOf(t.o) ? t.ischooseright = 3 : -1 == i.rightkey.indexOf(t.o) && (t.ischooseright = 4);
        }), this.setData({
            answerlist: e
        }), this.judge(this.data.index), this.recordAnswer()) : wx.showToast({
            icon: "none",
            title: "请选择你的答案~"
        });
    },
    textInput: function(t) {
        t.currentTarget.dataset.item;
        var a = t.currentTarget.dataset.fjnum, e = t.currentTarget.dataset.inputnum, i = this.data.answerlist;
        i[a].choose[e] = t.detail.value;
        var s = 0;
        this.isempty(i[a].choose) ? i[a].issure = !0 : i[a].issure = !1, i.forEach(function(t) {
            2 == t.type ? t.flag && s++ : 4 == t.type ? t.issure && s++ : 5 == t.type ? t.iscomplete && s++ : t.choose && s++;
        }), this.setData({
            answerlist: i,
            answerlength: s
        });
    },
    goSure: function(t) {
        var a = t.currentTarget.dataset.fjnum, e = (t.currentTarget.dataset.item, this.data.answerlist);
        e[a] && this.isempty(e[a].choose) ? (e[a].iswrite = !0, this.setData({
            answerlist: e
        }), this.judge(this.data.index), this.recordAnswer()) : wx.showToast({
            icon: "none",
            title: "请填写完整~"
        });
    },
    vioceChoice: function(t) {
        console.log(t), t.currentTarget.dataset.item;
        var a = t.currentTarget.dataset.fjnum, e = t.currentTarget.dataset.zjnum, i = t.currentTarget.dataset.option, s = this.data.answerlist, n = 0, o = "answerlist[" + a + "].choose[" + e + "].choose";
        this.setData(_defineProperty({}, o, i)), this.isempty(s[a].choose) ? s[a].iscomplete = !0 : s[a].iscomplete = !1, 
        s.forEach(function(t) {
            2 == t.type ? t.flag && n++ : 4 == t.type ? t.issure && n++ : 5 == t.type ? t.iscomplete && n++ : t.choose && n++;
        }), this.setData({
            answerlist: s,
            answerlength: n
        }), this.judge(this.data.index), this.recordAnswer(), console.log(s);
    },
    onReady: function() {
        var t = wx.createInnerAudioContext();
        this.setData({
            audioCtx: t
        });
    },
    onHide: function() {
        this.changepic(this.data.index), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    onUnload: function() {
        this.changepic(this.data.index), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    goCorrection: function(t) {
        app.globalData.id = t.currentTarget.id, wx.navigateTo({
            url: "../feedback/feedback"
        });
    },
    bindplay: function(t) {
        console.log(t);
        var a = t.currentTarget.id;
        if (this.data.playIndex) {
            var e = wx.createVideoContext([ "index", this.data.playIndex ].join(""));
            e.seek(0), e.pause(), console.log([ "index", this.data.playIndex ].join("")), this.setData({
                playIndex: a
            }), console.log([ "index", this.data.playIndex ].join("")), wx.createVideoContext([ "index", this.data.playIndex ].join("")).play();
        } else this.setData({
            playIndex: a
        }), wx.createVideoContext([ "index", a ].join("")).play();
    },
    mockExam: function(t, a,reload=false) {
        var e = this;
        this.setData({
            isloading: !0
        });
        var i = "";
        app.globalData.paperId && (i = app.globalData.paperId), dataApi.sequence({
			curPage: this.data.current_page,
            uid: wx.getStorageSync("uid"),
            op: t,
            typeId: a,
            paperid: i
        }).then(function(t) {
            if (t.data.list.length <= 0) e.setData({
                have: t.data.have,
                isloading: !1
            }); else {
                var r = [], d = [], h = [], c = [], u = [], p = [];
                t.data.list && (t.data.list.forEach(function(t) {
                    if (2 == t.type) {
                        var a = t.rightkey.split(","), e = [];
                        t.option.forEach(function(t) {
                            e.push({
                                o: t.o,
                                ischoose: !1
                            });
                        }), r.push({
                            type: t.type,
                            tid: t.id,
                            issure: !1,
                            flag: !1,
                            choose: e,
                            isanalysis: !1,
                            isjudge: 3
                        }), t.option.forEach(function(t) {
                            -1 != a.indexOf(t.o) ? t.right = !0 : t.right = !1;
                        });
                    } else if (4 == t.type) {
                        for (var i = [], s = 0; s < t.rightarray.length; s++) i.push("");
                        r.push({
                            type: t.type,
                            tid: t.id,
                            issure: !1,
                            choose: i,
                            iswrite: !1,
                            isanalysis: !1,
                            isjudge: 3
                        });
                    } else if (5 == t.type) {
                        var n = [], o = [];
                        t.list.forEach(function(t) {
                            n.push({
                                tid: t.id,
                                choose: ""
                            }), o.push(t.rightkey);
                        }), t.rightkey = o.join(","), r.push({
                            type: t.type,
                            tid: t.id,
                            iscomplete: !1,
                            choose: n,
                            isanalysis: !1,
                            isjudge: 3
                        });
                    } else r.push({
                        type: t.type,
                        tid: t.id,
                        issure: !1,
                        choose: "",
                        isanalysis: !1,
                        isjudge: 3
                    });
                    t.qaudio ? d.push({
                        audiosrc: t.qaudio,
                        time: 0
                    }) : d.push({
                        audiosrc: "",
                        time: 0
                    }), 2 == t.a_type ? h.push(t.option) : h.push(""), 4 == t.type ? c.push(t.rightarray.join(",")) : c.push(t.rightkey), 
                    t.analysis_audio ? u.push({
                        audiosrc: t.analysis_audio,
                        time: 0
                    }) : u.push({
                        audiosrc: "",
                        time: 0
                    }), p.push(t.aimage);
                }), t.data.list && e.setData({
					current_page:t.data.curPage*1,
					data_total:t.data.total_qnum,
                    paperdetail: t.data.list,
                    answerlist: r,
                    audiolist: d,
                    rightAnswer: c,
                    answerAudiolist: u,
                    answerImglist: p
                }), t.data.last_id != undefined && !reload && e.setData({
                    index: Number(t.data.last_id % 100)
                }), e.setData({
                    isloading: !1
                }));
            }
        }).catch(function(t) {
            e.setData({
                isloading: !1
            }), console.log(t);
        });
    },
    isempty: function(t) {
        var a = new Boolean();
        for (var e in a = !0, t) t[e] || (a = !1);
        return !!a;
    },
    lookAnaiysis: function() {
        var t = this.data.answerlist, a = (this.data.paperdetail, this.data.index);
        t[a].isanalysis = !0, this.setData({
            answerlist: t
        }), WxParse.wxParse("article", "html", this.data.paperdetail[a].analysis, this, 15);
    },
    changepic: function(t) {
        2 != this.data.have && 0 != this.data.audiolist.length && (!this.data.audiolist[t].url || this.data.audiolist[t].url != this.data.audiolist[t - 1].url && 0 < t) && (this.setData({
            isaudio: 1,
            isAnalysisAudioPlay: 1
        }), this.data.audioCtx.pause());
    },
    myAudioStart: function(t) {
        var a = this.data.audioCtx, e = this, i = this.data.audiolist, s = t.currentTarget.dataset.type;
        "paper" == s && (this.setData({
            isaudio: 2
        }), a.src = t.currentTarget.dataset.src, 0 != i[t.currentTarget.dataset.num].time ? (a.play(), 
        a.seek(i[t.currentTarget.dataset.num].time), console.log(i[t.currentTarget.dataset.num].time, "跳")) : a.play(), 
        this.currenttime(), this.data.onEnded || (this.data.onEnded = !0, a.onEnded(function() {
            e.setData({
                isaudio: 1,
                currentTime: 0
            }), e.audiotime(t.currentTarget.dataset.src, 0);
        }))), "analysis" == s && (this.setData({
            isAnalysisAudioPlay: 2
        }), a.src = t.currentTarget.dataset.src, 0 != i[t.currentTarget.dataset.num].time ? (a.play(), 
        a.seek(answerAudiolist[t.currentTarget.dataset.num].time)) : a.play(), this.currenttime(), 
        this.data.onEnded || (this.data.onEnded = !0, a.onEnded(function() {
            e.setData({
                isAnalysisAudioPlay: 1,
                currentTime: 0
            }), e.audiotime(t.currentTarget.dataset.src, 0);
        })));
    },
    myAudioPause: function(t) {
        var a = this.data.audioCtx, e = this;
        a.pause();
        var i = t.currentTarget.dataset.type;
        "paper" == i && (this.data.onPause || (this.data.onPause = !0, a.onPause(function() {
            a.currentTime, e.setData({
                isaudio: 1
            }), e.audiotime(t.currentTarget.dataset.src, Math.floor(a.currentTime));
        }))), "analysis" == i && (this.data.onPause || (this.data.onPause = !0, a.onPause(function() {
            a.currentTime, e.setData({
                isAnalysisAudioPlay: 1
            }), e.audiotime(t.currentTarget.dataset.src, Math.floor(a.currentTime));
        })));
    },
    currenttime: function(t) {
        var a = this.data.audioCtx;
        setTimeout(function() {
            a.currentTime, a.onTimeUpdate(function() {});
        }, 100);
    },
    audiotime: function(a, e) {
        this.data.audiolist.forEach(function(t) {
            t.url == a && (t.time = e);
        });
    },
    judge: function(t) {
        var a = this.data.answerlist, e = (this.data.paperdetail, this.data.rightAnswer), i = "";
        if (2 == a[t].type) {
            var s = [];
            a[t].choose.forEach(function(t) {
                t.ischoose && s.push(t.o);
            }), i = s.join(",");
        } else if (4 == a[t].type) i = a[t].choose.join(","); else if (5 == a[t].type) {
            var n = [];
            a[t].choose.forEach(function(t) {
                n.push(t.choose);
            }), i = n.join(",");
        } else i = a[t].choose;
        i && (i == e[t] ? a[t].isjudge = 1 : a[t].isjudge = 2), this.setData({
            answerlist: a
        });
    },
    recordAnswer: function() {
        var t = this.data.answerlist, s = [], a = "";
        t.forEach(function(t) {
            if (1 == t.type || 3 == t.type) s.push({
                tid: t.tid,
                type: t.type,
                answer: t.choose
            }); else if (2 == t.type) {
                var a = [];
                t.choose.forEach(function(t) {
                    t.ischoose && a.push(t.o);
                }), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: a
                });
            } else if (4 == t.type) {
                var e = [];
                t.choose.forEach(function(t) {
                    e.push("【" + t + "】");
                }), e = e.join(","), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: e
                });
            } else {
                var i = [];
                t.choose.forEach(function(t) {
                    i.push({
                        tid: t.tid,
                        answer: t.choose
                    });
                }), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: i
                });
            }
        });
        var e = {};
        "sequence" == app.globalData.op ? a = "shunxu" : "qhigh" == app.globalData.op ? a = "qhigh" : "intensive" == app.globalData.op ? a = "intensive" : "special" == app.globalData.op || "qspecial" == app.globalData.op ? (a = "qspecial", 
        e = {
            special_id: this.data.special_id
        }) : "qtype" == app.globalData.op || "qtype_submit" == app.globalData.op ? (a = "qtype_submit", 
        e = {
            type_id: this.data.special_id
        }) : a = "other",  dataApi.sequence_submit(_extends({
            uid: wx.getStorageSync("uid"),
            answerdata: JSON.stringify(s[this.data.index]),
            op: a,
            index: this.data.current_page*100 + this.data.index
        }, e)).then(function(t) {
            console.log(t);
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShareAppMessage: function() {}
});