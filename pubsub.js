/**
 * Created by caozheng on 2016/12/7.
 */
/*这里是传统模式观察者模式
 实现的只是一种模式，如果开发使用的是异步的操作
 会导致以下问题：

 事件的发布Publish时，为了不阻断进程使用setTimeout重新开启了一个进程，在一定场景下提升了性能.
 造成的问题：
 使用观察者模式，开发者使用的肯定是同步式的写法，并没有开启异步回调。
 所以当发布一个事件之后在短时间内取消了这个订阅。会导致在事件的发布过程中就被扼杀掉。

 处理方案: （将使用第二种方案）
 1、 观察者模式不变，改变开发者写法。
 开发者将使用async await、promise、co等异步转同步的写法。
 从而解决publish的时候被unTopic/unSubscribe给杀掉

 2、改变观察者模式转换成异步写法 async pubsub
 观察者模式监听观察者模式直到publish事件之后，才能被杀掉。
 开发者依然可以使用同步写法

 TODO async pubsub
 */

var pubsub = {};
(function (q) {

    var topics = {}, //回到存放的数组
        subUid = 0;

    // 订阅方法
    q.subscribe = function (topic, func) {

        if(!topics[topic]){
            topics[topic] = []
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token : token,
            func : func
        });

        return token
    };

    // 发布方法
    q.publish = function (topic, args) {

        if(!topics[topic]){
            return false
        }

        setTimeout(function () {
            var subscribes = topics[topic],
                len = subscribes ? subscribes.length : 0;

            while (len--){
                subscribes[len].func(topic, args)
            }
        }, 0);

        return true
    };

    // 根据token 退订已订阅的token方法
    // 无关topic
    q.unSubscribe = function (token) {

        for(var m in topics){
            if(topics[m]){
                for(var i = 0, j = topics[m].length; i<j ; i++){
                    if(topics[m][i].token === token){
                        topics[m].splice(i, 1);
                        return token
                    }
                }
            }
        }
    };

    // 根据topic退订
    // @boolean boolean (是否全部退订) 默认false 全部退订
    q.unTopic = function (topic, boolean) {

        if(!topic){
            // 主题是否存在
            return false
        }
        if(!boolean){
            // 默认全部退订
            if(topics[topic]){

                delete topics[topic]
            }
        }
        return true

    };

    // 所有订阅的topic
    q.getAllTopic = function () {

        var arrTopics = [];

        if(!Object.keys(topics).length){
            return arrTopics
        }
        for (var m in topics){

            arrTopics.push(m)
        }
        return arrTopics
    }

})(pubsub);
