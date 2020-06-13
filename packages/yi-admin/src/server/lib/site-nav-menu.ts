
export class SiteNavMenu {
   /**
    * 菜单名称
    */
   public title = ''

   /**
    * 链接
    */
   public link = '';

   /**
    * 图标
    */
   public icon = '';

   /**
    * 子类
    */
   public children: SiteNavMenu[] = []

   constructor (config: {
      title: string;
      link?: string;
      icon?: string;
      children?: SiteNavMenu[];
   }) {
      this.title = config.title;
      if (typeof config.link === 'string') { this.link = config.link; }
      if (typeof config.icon === 'string') { this.icon = config.icon; }
      if (Array.isArray(config.children)) {
         config.children.forEach((item) => this.add(item));
      }
   }

   public add (menu: SiteNavMenu): SiteNavMenu {
      if (!(menu instanceof SiteNavMenu)) throw new Error('请添加一个SiteNavMenu对象');
      this.children.push(menu);
      return this;
   }
}
