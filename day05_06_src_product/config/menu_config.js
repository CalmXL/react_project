// 项目的菜单配置
import {
  AppstoreOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  SolutionOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

export  const menuList =  [
  {
    "title":"home",
    "icon":<HomeOutlined />,
    "key":"home",
    "path":"/admin/home"
  },
  {
    "title":"商品",
    "icon":<AppstoreOutlined />,
    "key":"prod_about",
    "children":[
      {
        "title":"分类管理",
        "icon":<UnorderedListOutlined />,
        "key":"category",
        "path":"/admin/prod_about/category"
      },
      {
        "title":"商品管理",
        "icon":<ToolOutlined />,
        "key":"product",
        "path":"/admin/prod_about/product"
      }
    ]
  },
  {
    "title":"用户管理",
    "icon":<UserOutlined />,
    "key":"user",
    "path":"/admin/user"
  },
  {
    "title":"角色管理",
    "icon":<SolutionOutlined />,
    "key":"role",
    "path":"/admin/role"
  },
  {
    "title":"图表",
    "icon":<AreaChartOutlined />,
    "key":"charts",
    "children":[
      {
        "title":"柱形图",
        "icon":<BarChartOutlined />,
        "key":"bar",
        "path":"/admin/charts/bar"
      },
      {
        "title":"折线图",
        "icon":<LineChartOutlined />,
        "key":"line",
        "path":"/admin/charts/line"
      },
      {
        "title":"饼图",
        "icon":<PieChartOutlined />,
        "key":"pie",
        "path":"/admin/charts/pie"
      },
   
    ]
  },
]