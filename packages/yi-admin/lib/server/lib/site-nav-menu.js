"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1uYXYtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3NpdGUtbmF2LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQWEsV0FBVztJQXFCckIsWUFBYSxNQUtaO1FBekJEOztXQUVHO1FBQ0ksVUFBSyxHQUFHLEVBQUUsQ0FBQTtRQUVqQjs7V0FFRztRQUNJLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFakI7O1dBRUc7UUFDSSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWpCOztXQUVHO1FBQ0ksYUFBUSxHQUFrQixFQUFFLENBQUE7UUFRaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ2pFLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ2pFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRDtJQUNKLENBQUM7SUFFTSxHQUFHLENBQUUsSUFBaUI7UUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLFdBQVcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNmLENBQUM7Q0FDSDtBQXhDRCxrQ0F3Q0MifQ==