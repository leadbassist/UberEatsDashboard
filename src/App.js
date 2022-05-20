import { Layout, Image } from "antd";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./components/AppRoutes";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig);

function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg"
          preview={false}
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Uber Eats Restaurant Dashboard ®2022
        </Footer>
      </Layout>
    </Layout>
  );
}

export default withAuthenticator(App);
