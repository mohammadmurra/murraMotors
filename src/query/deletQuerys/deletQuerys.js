import {gql} from '@apollo/client';

export const DELET_EMPLOYEE = gql`
  query deletEmployee($id: String, $email: String) {
    deletEmployee(id: $id, email: $email) {
      result
    }
  }
`;
export const EDIT_EMPLOYEE = gql`
  query EditEmployee($data: employe, $oldPasswar: String) {
    EditEmployee(data: $data, oldPasswar: $oldPasswar) {
      result
    }
  }
`;
export const DELET_SALEPOINT = gql`
  query deletSalePoint($id: String, $email: String) {
    deletSalePoint(id: $id, email: $email) {
      result
    }
  }
`;
export const EDIT_SALEPOINT = gql`
query EditSalepoint($data: salePoint, $oldPasswar: String) {
  EditSalepoint(data: $data, oldPasswar: $oldPasswar) {
      result
    }
  }
`;
export const DELET_RUNINGCOST = gql`
  query deletRuningCost($id: String, $email: String) {
    deletRuningCost(id: $id, email: $email) {
      result
    }
  }
`;
export const MARK_FEEDBACK_READED = gql`
  query markAsReaded($id: String, $email: String) {
    markAsReaded(id: $id, email: $email) {
      result
    }
  }
`;
