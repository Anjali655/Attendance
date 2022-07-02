import { gql } from "@apollo/client";

const LoginEmp = gql`
  query Query($input: loginInput) {
    empLogin(input: $input) {
      data {
        token
      }
      message
      status
    }
  }
`;
export default LoginEmp;
