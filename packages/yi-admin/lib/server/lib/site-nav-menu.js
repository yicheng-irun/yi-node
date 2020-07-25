"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteNavMenu = void 0;
/**
 * 站点导航菜单
 */
class SiteNavMenu {
    constructor(config) {
        /**
         * 菜单名称
         */
        this.title = '';
        /**
         * 链接
         */
        this.link = '';
        /**
         * a标签的target属性
         */
        this.target = 'main_frame';
        /**
         * 图标
         */
        this.icon = '';
        /**
         * 子类
         */
        this.children = [];
        this.title = config.title;
        if (typeof config.link === 'string') {
            this.link = config.link;
        }
        if (typeof config.icon === 'string') {
            this.icon = config.icon;
        }
        if (typeof config.target === 'string') {
            this.target = config.target;
        }
        if (Array.isArray(config.children)) {
            config.children.forEach((item) => this.add(item));
        }
    }
    add(menu) {
        if (!(menu instanceof SiteNavMenu))
            throw new Error('请添加一个SiteNavMenu对象');
        this.children.push(menu);
        return this;
    }
}
exports.SiteNavMenu = SiteNavMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1uYXYtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3NpdGUtbmF2LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUEwQnJCLFlBQWEsTUFNWjtRQS9CRDs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUE7UUFFakI7O1dBRUc7UUFDSSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWpCOztXQUVHO1FBQ0ksV0FBTSxHQUFxQyxZQUFZLENBQUM7UUFFL0Q7O1dBRUc7UUFDSSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWpCOztXQUVHO1FBQ0ksYUFBUSxHQUFrQixFQUFFLENBQUE7UUFTaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ2pFLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ2pFLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3ZFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRDtJQUNKLENBQUM7SUFFTSxHQUFHLENBQUUsSUFBaUI7UUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLFdBQVcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNmLENBQUM7Q0FDSDtBQS9DRCxrQ0ErQ0MifQ==