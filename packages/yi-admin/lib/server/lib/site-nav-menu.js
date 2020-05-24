"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
         * 子类
         */
        this.childrens = [];
        this.title = config.title;
        if (typeof config.link === 'string') {
            this.link = config.link;
        }
    }
    add(menu) {
        this.childrens.push(menu);
        return this;
    }
}
exports.default = SiteNavMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1uYXYtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3NpdGUtbmF2LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFxQixXQUFXO0lBZ0I3QixZQUFhLE1BR1o7UUFsQkQ7O1dBRUc7UUFDSSxVQUFLLEdBQUcsRUFBRSxDQUFBO1FBRWpCOztXQUVHO1FBQ0ksU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVqQjs7V0FFRztRQUNJLGNBQVMsR0FBa0IsRUFBRSxDQUFBO1FBTWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtJQUNwRSxDQUFDO0lBRU0sR0FBRyxDQUFFLElBQWlCO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2YsQ0FBQztDQUNIO0FBNUJELDhCQTRCQyJ9