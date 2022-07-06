import { proxy } from "epii-xx-admin";
import page_test from "./page_test";
import menu_test from "./menu_test.vue";
export default {
    install() {
       // proxy.tabs.add(page_test, {}, { title: "测试页面1" });
        proxy.menu.addMenu({
            label: "ceshi",
            key: "ceshi",
            component: page_test,
            selected: true,
        });
        proxy.menu.addMenu({ label: "123", key: "123", component: menu_test });
        proxy.menu.addMenu([
            {
                label: "学五",
                key: "学五",
                component: menu_test,
                children: [
                    {
                        label: "++",
                        key: "++",
                    },
                ],
            },
            {
                label: "ces",
                key: "ces",
                component: menu_test,
            },
            {
                label: "11",
                key: "11",
                component: menu_test,
            },
        ]);

        proxy.logo.setTitle("什么什么系统");
        proxy.logo.setIcon(require("../../../assets/images/logo.png"));
    }
};