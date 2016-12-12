/**
 * Created by caozheng on 2016/12/12.
 */
var pubsub = require('./../pubsub');
var expect = require('chai').expect;

var globalA = "test";
function testFuc(topic, args) {
    globalA = globalA + args;
    return topic
}

var token = pubsub.subscribe('testAction', testFuc);
var publish = pubsub.publish('testAction', "testPublish");

describe('pubsub constructor', function () {
    describe('#action', function () {
        it('subscribe return token', function () {
            expect(token).to.be.equal('1')
        });
        it('getAllTopic', function () {
            expect(pubsub.getAllTopic()).to.be.deep.equal(['testAction'])
        });
        it('publish return boolean', function () {
            expect(publish).to.be.equal(true);
        });
        it('event trigger return result', function () {
            expect(globalA).to.be.equal("testtestPublish")
        });

        it('event unSubscribe', function () {
            setTimeout(function () {
                pubsub.unSubscribe('1');
                expect(publish).to.be.equal(false)
            }, 50);
        })


    })

});
