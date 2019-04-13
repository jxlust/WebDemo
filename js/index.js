var configVue = new Vue({
	el: '#app',
	data: {
		chooseTypeIndex: -1,
		test: 1,
		isNewAsk: false,
		testAsk: [{
				id: 1,
				count: 10,
				isAdopt: false,
				text: 'AE CS5序列号序列号是什么AE CS5序列号序列CS5序什么什么？',
				awardType: 0,
				ask: {
					name: '溜溜专属客服',
					text: '如果只是比例缩小了，那你就检查一下视口比例，然后把比例调整回来就可以了哦！'
				}
			},
			{
				id: 2,
				count: 10,
				isAdopt: true,
				text: 'AE CS5序列序什么什么？',
				awardType: 1,
				ask: {
					name: '溜溜专属客服',
					text: '如果只是比例以了哦！'
				}
			},
			{
				id: 3,
				count: 2,
				isAdopt: true,
				text: 'AE CS5序列序什么什么？',
				awardType: 1,
				ask: {
					name: '溜溜专属客服',
					text: '如果只是比例以了哦！'
				}
			},
			{
				id: 4,
				count: 0,
				isAdopt: false,
				text: 'AE CS5序列序什么什么？',
				awardType: 1,
				ask: {
					name: '溜溜专属客服',
					text: '如果只是比例以了哦！'
				}
			}
		],
		/*搜索框 */
		msg: 'ss',
		searchData: [],
		chooseIndex: -1,
	},
	//el 和 data 并未初始化
	beforeCreate: function() {
		//举个栗子：可以在这加个loading事件 
		//console.log('beforeCreate 创建前状态===============》');
	},
	//完成了 data 数据的初始化，el没有
	created: function() {
		//在这结束loading，还做一些初始化，实现函数自执行 
		//console.log('created 创建完毕状态===============》');

	},
	//完成了 el 和 data 初始化 
	beforeMount: function() {
		//console.log('beforeMount 挂载前状态===============》');
	},
	beforeUpdate: function() {
		//console.log('beforeUpdate 更新前状态===============》');
	},
	updated: function() {
		//console.log('updated 更新完成状态===============》');
	},
	beforeDestroy: function() {
		//console.log('beforeDestroy 销毁前状态===============》');
	},
	destroyed: function() {
		//console.log('destroyed 销毁完成状态===============》');
	},
	/*渲染完dom 完成挂载*/
	mounted: function() {
		console.log("mounted..");
	},
	/*计算属性*/
	computed: {
		// 计算属性的 getter
		loginMessage: function() {
			// `this` 指向 vm 实例
			return "我是开始的计算属性";
			//return sessionStorage.getItem('userName');
		},
	},
	methods: {
		showSuggest: function(n) {
			console.log(1);
			this.test = n;
		},
		showAsk: function(isNew) {
			this.isNewAsk = isNew;
			this.testAsk.splice(0, 1, {
				id: 5,
				count: 0,
				isAdopt: false,
				text: '我是替换的哈哈哈哈' + Math.random(100),
				awardType: 1,
				ask: {
					name: '溜溜专属客服',
					text: '如果只是比例以了哦！'
				}
			});
		},
		search() {
			if (this.msg != '') {
				window.location.href = `https://www.baidu.com/s?wd=${this.msg}`
				this.msg = '';
				this.searchData = [];
			};
		},
		searchItemClick(value, index) {
			this.chooseIndex = index;
			this.msg = value;
			/* this.toSearchPage() */
		},
		searchKeyUp(event) {
			if (event.keyCode == 38 || event.keyCode == 40) { //每按一次上下键都会发送一次请求，所以要先
				return; //清除一边请求
			};
			console.log(event.which)
			var dat = {
				wd: this.msg
			};
			if (this.msg != '') { //当输入框的值不为空的时候才能发送请求
				this.searchData = [];
				this.chooseIndex = -1;
				var that = this;
				$.ajax({
					type: "get",
					url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
					async: true,
					data: dat,
					dataType: 'jsonp', //已经跨域了
					jsonp: 'cb', //百度的回调函数
					success: function(res) {
						console.log(res.s);
						for (var i = 0; i < res.s.length; i++) {
							that.searchData.push(res.s[i]);
						};

					},
					error: function(res) {
						console.log(res)
					}
				});
			} else {
				this.searchData = []; //如果输入框的词都删除了，把获取的数据结果也清空，因为已经获取到数据了，即使阻止再次发送请求也不会把已经获得的数据清除，所以这里直接用了最简单的办法，直接清空数据
			};
		},
		searchKeyDown(ev) {
			if (ev.keyCode == 40) { //按下键时，chooseIndex应该变大
				this.chooseIndex++;
				this.msg = this.searchData[this.chooseIndex];
				if (this.chooseIndex == this.searchData.length - 1) {
					this.chooseIndex = -1; //当选择的数据已经到了最底部的时候，就要从顶部开始重新循环，回到-1
				}
			};
			if (ev.keyCode == 38) {
				this.chooseIndex--; //按上键的时候，光标往上走，所以now减小  
				if (this.chooseIndex <= -1) {
					this.chooseIndex = this.searchData.length - 1 //当光标走到最上面的时候，再循环到底部重新往上走
				} else {};
				this.msg = this.searchData[this.chooseIndex];

			};
			if (ev.keyCode == 13) { //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口
				this.toSearchPage();
			}
		},
		toSearchPage() {
			window.open('https://www.baidu.com/s?wd=' + this.msg)
			this.msg = '';
			this.chooseIndex = -1;
			this.searchData = [];
		}

	},
	/*属性监听器*/
	watch: {
		fieldTypeSelected: function(newQuestion, oldQuestion) {
			console.log("new:" + newQuestion + ",old:" + oldQuestion);
		}
	}
});
