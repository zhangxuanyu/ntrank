<template>
    <div id="trendbox">
        <p class="title">概述</p>
        <div class="content depict">
            <span>STEEM 是 Steem 区块链上基本的账户单位，其他 Token 的价值均从 STEEM 的价值衍生出来，进出 Steem 平台，需要购买或者卖出 STEEM，持有 STEEM 后通过换成 SP 或者 SBD 可以消除稀释的影响。</span>
            <span>SP 是类似股权的资产，长期投资，STEEM 的另一种状态，STEEM 转换成 SP 的表现形式是持有的 STEEM  被锁定在 Steem 平台。SP 持有者可以对 Steem 平台上的内容进行投票，每年从通胀中获得相应比例的 STEEM，持有的 SP 越多，权力越大。SP 不可分割、不可转让、不可出售，但可以出租（授权）。</span>
            <span>SBD是与美元锚定，当持有SBD时，可以随时用SBD兑换同等价值的STEEM。STEEM转换SBD比例是由见证人每小时提供一个STEEM对美元价格，Steem区块链按3.5天为一个周期，取这些价格的中位数做为STEEM转换SBD的价格。设置SBD代币，是为了更好地激励用户，且可以变相减少STEEM代币的流通量，部分抵消STEEM增发机制对币价的冲击。</span>
        </div>
        <p class="title">关系</p>
        <div class="content relation">
            <span>如图所示，SBD 与 SP 无法直接转换，必须通过 STEEM 进行转换；持有 STEEM 会有通胀损失，理性投资者会将其转化成 SP 或者 SBD；Steem 鼓励长期持有，向 SP 持有人按照通胀比例会奖励 STEEM。</span>
            <div>
                 <img src="../../static/image/guanxi1.png" alt="">
            </div>
        </div>
        <p class="title">产生及分配</p>
        <div class="content depict">
            <span>STEEM 网络初始货币供应量为 0，并且 STEEM 的代币总量没有上限。以每分钟约 40 STEEM 的速率将 STEEM 分配至挖矿者（Sujective PoW），且每分钟还可创建额外的 40 STEEM 计入内容奖励池（每分钟总共 80 STEEM ），将 STEEM 转化为 SP 的用户可以开始获得网络奖励，这时 STEEM 每分钟以约 800 STEEM（80+80*9）速度增长，具体增长比例如下表所示：</span>
            <div>
                <img src="../../static/image/jiangli1.png" alt="" class="jiangli">
            </div>
            <span>通胀产生的 STEEM，75% 会分配给奖励池，用于奖励内容创作者和评论者；15% 分配给 SP 持有者，作为 SP 持有者的股息收入；10% 分配给见证人。</span>
            <div>
                <img src="../../static/image/fenpei1.png" alt="" class="fenpei">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#trendbox{
    width: 100%;
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    overflow: hidden;
    .title{
        font-size: 14px;
        color: #303030;
        font-weight: 600;
        margin-top: 30px;
    }
    .content{
        font-size: 14px;
        color: #303030;
        line-height: 21px;  
        span{
            margin-top: 20px;
            display: inline-block
        }  
        div{
            width: 100%;
            text-align: center;
        }
    }
    .relation{
        color: $color;
      
        img{
            width:620px;
            text-align: center
        }
    }
    .jiangli{
        width: 620px;
    }
    .fenpei{
        width: 620px;
    }
}
</style>
