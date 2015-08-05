define('scrolLoading', function (require, exports, module) {
    function ScrolLoading(option){
        this.distance = option.distance || 100;
        this.dom = option.dom || document;
        this.loadCall = option.loadCall;
        this.loadStatus = true;
        this._loadEvent();
        return this;
    }

    ScrolLoading.prototype._update = function () {
        if(this.$wrap) {
            this.wrapH = this.$wrap.offset().top + this.$wrap.height();
        }
    }

    ScrolLoading.prototype._loadEvent = function () {
        var _self = this;

        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();

            if ((_self.scrollHeight - (scrollTop + _self.windowHeight)) < _self.distance ) {
                _self.loadStatus && _self.loadCall();
                _self.loadStatus = false;

            }
        }); 
    }

    ScrolLoading.prototype._refresh = function(){
        this.windowHeight = $(window).height();
        this.scrollHeight = $(this.dom).height();
    }

    ScrolLoading.prototype._close = function(){
        $(window).unbind("scroll");
    }

    module.exports = ScrolLoading
});