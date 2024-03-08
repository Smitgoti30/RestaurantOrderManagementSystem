import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
	query GetAllEmployees($filters: employee_data) {
		getAllEmployees(filters: $filters) {
			_id
			age
			currentStatus
			dateOfJoining
			department
			employeeType
			lastName
			firstName
			title
			retire
			remaining
		}
	}
`;
export const GET_EMPLOYEE_DETAILS = gql`
	query GetEmployee($employee_id: ID!) {
		getEmployeeById(user_id: $employee_id) {
			_id
			firstName
			lastName
			age
			dateOfJoining
			title
			department
			employeeType
			currentStatus
			retire
			remaining
		}
	}
`;
