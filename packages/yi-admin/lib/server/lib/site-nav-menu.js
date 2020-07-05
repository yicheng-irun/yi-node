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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1uYXYtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3NpdGUtbmF2LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQWEsV0FBVztJQTBCckIsWUFBYSxNQU1aO1FBL0JEOztXQUVHO1FBQ0ksVUFBSyxHQUFHLEVBQUUsQ0FBQTtRQUVqQjs7V0FFRztRQUNJLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFakI7O1dBRUc7UUFDSSxXQUFNLEdBQXFDLFlBQVksQ0FBQztRQUUvRDs7V0FFRztRQUNJLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFakI7O1dBRUc7UUFDSSxhQUFRLEdBQWtCLEVBQUUsQ0FBQTtRQVNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDakUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDakUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQUU7UUFDdkUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0osQ0FBQztJQUVNLEdBQUcsQ0FBRSxJQUFpQjtRQUMxQixJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksV0FBVyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2YsQ0FBQztDQUNIO0FBL0NELGtDQStDQyJ9