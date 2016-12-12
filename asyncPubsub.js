/**
 * Created by caozheng on 2016/12/7.
 */
let co = require('co');
import "babel-polyfill"
(function (win, undefined) {
    // 全局防止undefined被污染
    undefined = undefined;
    /*
    * topic return @Object 事件堆栈存储空间
    * subUid  return @Number 堆栈标记
    * asyncResult return @Primise 用来检测堆栈的事件是否执行完毕
    * asyncArr return @Primise Array 返回异步事件列表
    * */
    var AsyncPubsub = (function() {
        var topics = {},
            subUid = 0,
            asyncResult = new Promise(function (resolve) {
                resolve()
            }),
            asyncArr = [];
        /*
        * topic @String 主键
        * args @any 事件发布时传入参数
        * */
        function _publish(topic, args) {
            if(!topics[topic]){
                return false
            }
            // 存放将要发布的事件数组，以及数组长度
            var subscribes = topics[topic],
                len = subscribes ? subscribes.length : 0;
            //console.log(topics);
            asyncResult = co(function *() {
                while (len--){
                    // 当前回调异步执行
                    if(subscribes[len].async){
                        // 判断是否为函数，这里和异步通信做兼容
                        if(typeof subscribes[len].func === "function"){
                            asyncArr.push(yield subscribes[len].func(topic, args));
                        }else{
                            asyncArr.push(yield subscribes[len].func);
                        }
                        continue;
                    }
                    // 正常回调
                    subscribes[len].func(topic, args)
                }
                return asyncArr
            });

        }
        /*
        * topic @string 主键
        * func @function 回调函数
        * async @boolean 回调函数是否是异步
        * */
        function _subscribe(topic, func, async) {
            if(!topics[topic]){
                topics[topic] = []
            }

            var token = (++subUid).toString();
            topics[topic].push({
                token : token,
                func : func,
                async : async
            });

            return token
        }
        /*
        * token @String 主键的标记
        *
        * */
        function _unsubscribe(token) {
            //console.log(topics);
            asyncResult.then(function (res) {
                "use strict";
                if(res){
                    console.log(res);
                    // 检测是否存在
                    for (var m in topics){
                        for(var i = 0,j = topics[m].length; i<j; i++){
                            if(topics[m][i].token == token){
                                topics[m].splice(i,1);
                                console.log(topics);
                                asyncResult = new Promise(function (resolve) {
                                    resolve()
                                });
                                return token
                            }
                        }
                    }
                }

            })
        }
        /*
        * topic return @String 订阅的事件的topic
        * unAllTopic @Boolean 是否卸载当前topic所有订阅
        * */
        function _unTopic(topic, unAllTopic){
            "use strict";
            if(!topic){
                // 主题是否存在
                return false
            }
            if(!unAllTopic){
                // 默认全部退订
                if(topics[topic]){
                    delete topics[topic];
                    return true
                }
            }
            // 退订最后进入的事件
            topics[topic].pop();
            return true

        }

        return {
            publish : _publish,
            subscribe : _subscribe,
            unsubscribe : _unsubscribe,
            unTopic : _unTopic
        }
    })();

    win.asyncPubsub = AsyncPubsub;
})(window ,undefined);