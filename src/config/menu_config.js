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
export default [
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
        "title":"category",
        "icon":<UnorderedListOutlined />,
        "key":"category",
        "path":"/admin/prod_about/category"
      },
      {
        "title":"product",
        "icon":<ToolOutlined />,
        "key":"product",
        "path":"/admin/prod_about/product"
      }
    ]
  },
  {
    "title":"user",
    "icon":<UserOutlined />,
    "key":"user",
    "path":"/admin/user"
  },
  {
    "title":"role",
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
        "title":"bar",
        "icon":<BarChartOutlined />,
        "key":"bar",
        "path":"/admin/charts/bar"
      },
      {
        "title":"line",
        "icon":<LineChartOutlined />,
        "key":"line",
        "path":"/admin/charts/Line"
      },
      {
        "title":"pie",
        "icon":<PieChartOutlined />,
        "key":"pie",
        "path":"/admin/charts/pie"
      },
   
    ]
  },
]