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
exports.SiteNavMenu = SiteNavMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1uYXYtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3NpdGUtbmF2LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFhLFdBQVc7SUFnQnJCLFlBQWEsTUFHWjtRQWxCRDs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUE7UUFFakI7O1dBRUc7UUFDSSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWpCOztXQUVHO1FBQ0ksY0FBUyxHQUFrQixFQUFFLENBQUE7UUFNakMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO0lBQ3BFLENBQUM7SUFFTSxHQUFHLENBQUUsSUFBaUI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZixDQUFDO0NBQ0g7QUE1QkQsa0NBNEJDIn0=