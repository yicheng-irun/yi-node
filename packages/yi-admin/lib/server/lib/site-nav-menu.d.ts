/**
 * 站点导航菜单
 */
export declare class SiteNavMenu {
    /**
     * 菜单名称
     */
    title: string;
    /**
     * 链接
     */
    link: string;
    /**
     * 图标
     */
    icon: string;
    /**
     * 子类
     */
    children: SiteNavMenu[];
    constructor(config: {
        title: string;
        link?: string;
        icon?: string;
        children?: SiteNavMenu[];
    });
    add(menu: SiteNavMenu): SiteNavMenu;
}
