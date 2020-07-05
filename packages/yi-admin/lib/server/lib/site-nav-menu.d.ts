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
     * a标签的target属性
     */
    target: 'main_frame' | '_blank' | string;
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
        target?: 'main_frame' | '_blank' | string;
        children?: SiteNavMenu[];
    });
    add(menu: SiteNavMenu): SiteNavMenu;
}
