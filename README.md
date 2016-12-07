# async-pubsub
 * pubsub.js
 
 这里是传统模式观察者模式
 实现的只是一种模式，如果开发使用的是异步的操作
 会导致以下问题：

 事件的发布Publish时，为了不阻断进程使用setTimeout重新开启了一个进程，在一定场景下提升了性能.
 造成的问题：
 
 使用观察者模式，开发者使用的肯定是同步式的写法，并没有开启异步回调。
 
 所以当发布一个事件之后在短时间内取消了这个订阅。会导致在事件的发布过程中就被扼杀掉。
 
    pubsub.subscribe('sayName',function () {
        console.log('my name is caozheng');
    });
    
    pubsub.publish('sayName');
    pubsub.unTopic('sayName');
    
    // 理想的结果是输出： my name is caozheng
    // 再将sayName订阅的事件给杀掉
    
    // 然而因为publish的时候使用的是setTimeout异步处理

    // 结果没有输出的时候就被unTopic杀掉了

 * 处理方案: （将使用第二种方案）
 
 1、 观察者模式不变，改变开发者写法。
 
 开发者将使用async await、promise、co等异步转同步的写法。
 从而解决publish的时候被unTopic/unSubscribe给杀掉

 2、改变观察者模式转换成异步写法 async pubsub
 观察者模式监听观察者模式直到publish事件之后，才能被杀掉。
 **开发者依然可以使用同步写法**
 
 * 理想实现写法与之前相同 asyncPubsub.js
 
 
     asyncPubsub.subscribe('sayName',function () {
         console.log('my name is caozheng');
     });
     
     asyncPubsub.publish('sayName');
     asyncPubsub.unTopic('sayName');
     
     // 输出： my name is caozheng
     
 
