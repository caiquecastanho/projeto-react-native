import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { TextInput, Button, Banner, HStack } from "@react-native-material/core";
import { Person } from "../model/Person";
import { FormInputController } from "../controller/FormInputController";
import * as yup from "yup";
import { Formik } from "formik";
import { ActivityIndicator } from "@react-native-material/core";
import { SignupResponse } from "../service/PersonService";

export default class FormInputScreen extends React.Component<any,FormInputState> {
  constructor(props: any) {
    super(props);
    this.state = { isLoading: false, errorOnSignUp: false, errorMessage: '' };
  }

  registerPerson = async (
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<void> => {
    const person: Person = { name, phone, email, password };
    try {
      this.setState({ isLoading: true });
      const response: SignupResponse = await FormInputController.signUp(person);
      this.setState({ isLoading: false });
      this.props.navigation.navigate("Login", { email, password });
    } catch (error) {
      this.setState({isLoading: false, errorOnSignUp: true, errorMessage: error.message});
      console.log(error);
    }
  };

  renderLoading(): JSX.Element {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  renderBanner(): JSX.Element {
    return (
      <Banner
      text={this.state.errorMessage}
      buttons={
        <HStack spacing={2}>
          <Button key="fix-it" variant="text" title="OK" compact onPress={() => this.setState({errorOnSignUp: false})} />
        </HStack>
      }
    />
    );
  }

  renderForm(): JSX.Element {
    return (
      <SafeAreaView style={{ flexDirection: "column" }}>
        <Formik
          initialValues={{ name: "", phone: "", email: "", password: "" }}
          onSubmit={(values) =>
            this.registerPerson(
              values.name,
              values.phone,
              values.email,
              values.password
            )
          }
          validationSchema={yup.object().shape({
            name: yup.string().required("O nome é obrigatório"),
            phone: yup
              .number()
              .min(
                10,
                ({ min }) => `Telefone deve ter pelo menos ${min} caracteres`
              )
              .required("Telefone é obrigatório"),
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
              <View style={{ flexDirection: "row", padding: 20 }}>
                <TextInput
                  autoCapitalize="none"
                  value={values.name}
                  variant="outlined"
                  placeholder="Nome"
                  style={{ flex: 1 }}
                  onChangeText={handleChange("name")}
                ></TextInput>
              </View>
              {touched.name && errors.name && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10", paddingLeft: 20 }}
                >
                  {errors.name}
                </Text>
              )}
              <View style={{ flexDirection: "row", padding: 20 }}>
                <TextInput
                  autoCapitalize="none"
                  value={values.phone}
                  variant="outlined"
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  style={{ flex: 1 }}
                  onChangeText={handleChange("phone")}
                ></TextInput>
              </View>
              {touched.phone && errors.phone && (
                <Text
                  style={{ fontSize: 12, color: "#FF0D10", paddingLeft: 20 }}
                >
                  {errors.phone}
                </Text>
              )}
              <View style={{ flexDirection: "row", padding: 20 }}>
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
              <View style={{ flexDirection: "row", padding: 20 }}>
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
              <View style={{ flexDirection: "row", padding: 20 }}>
                <Button
                  disabled={!isValid}
                  style={{ flex: 1 }}
                  title="Cadastrar"
                  onPress={handleSubmit}
                />
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
        {this.state.errorOnSignUp && !this.state.isLoading && this.renderBanner()}
        {this.state.isLoading && this.renderLoading()}
        {!this.state.isLoading && this.renderForm()}
      </>
    );
  }
}

interface FormInputState {
  isLoading: boolean;
  errorOnSignUp: boolean;
  errorMessage: string;
}
