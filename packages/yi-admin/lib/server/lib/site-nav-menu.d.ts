export default class SiteNavMenu {
    /**
     * 菜单名称
     */
    title: string;
    /**
     * 链接
     */
    link: string;
    /**
     * 子类
     */
    childrens: SiteNavMenu[];
    constructor(config: {
        title: string;
        link?: string;
    });
    add(menu: SiteNavMenu): SiteNavMenu;
}
