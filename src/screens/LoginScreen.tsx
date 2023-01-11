import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput, Button, ActivityIndicator } from "@react-native-material/core";
import {AuthContext, AuthContextType} from "../contexts/AuthContext";

export default class LoginScreen extends React.Component<LoginProps, LoginState> {

  constructor(props: LoginProps) {
    super(props);
    this.state = {isLoading: false };
  }

  async login(email: string, password: string): Promise<void>{
    try{
      const {authContextLogin} = this.context as AuthContextType;
      this.setState({isLoading: true});
      await authContextLogin(email, password);
      this.props.navigation.navigate('Products');
    }catch(error){
      console.log("Erro ao executar login");
    }
  }

  renderLoading(): JSX.Element {
    return (
        <>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        </>
        );
  }

  renderContent(): JSX.Element {
    const emailProp = this.props.route && this.props.route.params ? this.props.route.params.email : '';
    const passwordProp = this.props.route && this.props.route.params ? this.props.route.params.password : '';
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Formik
        enableReinitialize={true}
        initialValues={{ email: emailProp, password: passwordProp }}
        onSubmit={(values) => this.login(values.email, values.password)}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Insira um email válido")
            .required("Email é obrigatório"),
          password: yup
            .string()
            .min(
              6,
              ({ min }) => `Password deve ter pelo menos ${min} caracteres`
            )
            .required("Password é obrigatório"),
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5 }}>
              <TextInput
                autoCapitalize="none"
                value={values.email}
                variant="outlined"
                placeholder="E-mail"
                style={{ flex: 1 }}
                onChangeText={handleChange("email")}
              ></TextInput>
            </View>
            {touched.email && errors.email && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", paddingLeft: 20 }}
              >
                {errors.email}
              </Text>
            )}
              <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5 }}>
              <TextInput
                autoCapitalize="none"
                value={values.password}
                secureTextEntry
                variant="outlined"
                placeholder="Senha"
                style={{ flex: 1 }}
                onChangeText={handleChange("password")}
              />
            </View>
            {touched.password && errors.password && (
              <Text
                style={{ fontSize: 12, color: "#FF0D10", paddingLeft: 20 }}
              >
                {errors.password}
              </Text>
            )}
            <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 5 }}>
              <Button
                disabled={!isValid}
                style={{ flex: 1 }}
                title="Login"
                loading={this.state.isLoading}
                loadingIndicatorPosition="overlay"
                onPress={handleSubmit}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'center', paddingVertical: 10 }}>
              <Text 
                  style={{fontWeight: 'bold'}}
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  >Novo Usuário</Text>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
    );
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.isLoading && this.renderLoading()}
        {!this.state.isLoading && this.renderContent()}
      </>
    );
  }
}
// Contexto de autenticação
LoginScreen.contextType = AuthContext;

interface LoginState {
  isLoading: boolean;
}

export type LoginProps = {
    email: string,
    password: string,
}