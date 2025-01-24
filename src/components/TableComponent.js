import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import COLORS from "../theme/colors";

const TableComponent = ({ tableHead, tableData, columnWidths }) => {
	return (
		<ScrollView horizontal>
			<View style={styles.container}>
				<View style={styles.tableWrapper}>
					<Table
						borderStyle={{
							borderWidth: 1,
							borderColor: COLORS.white,
						}}
					>
						{/* Table Header */}
						<Row
							data={tableHead}
							widthArr={columnWidths}
							style={styles.head}
							textStyle={styles.headText}
						/>
						{/* Table Rows with Alternating Colors */}
						{tableData.map((rowData, index) => (
							<Row
								key={index}
								data={rowData}
								widthArr={columnWidths}
								style={[
									styles.row,
									index % 2 === 0 ? styles.rowGray : styles.rowWhite,
								]}
								textStyle={[
									styles.text,
									index === tableData.length - 1 && styles.boldText, // Apply bold text for the last row
								]}
							/>
						))}
					</Table>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { padding: 10, backgroundColor: "#fff" },
	tableWrapper: {
		borderRadius: 10,
		overflow: "hidden",
	},
	head: { height: 50, backgroundColor: "#00A8B5" },
	headText: {
		margin: 6,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
	},
	text: {
		marginVertical: 6,
		marginHorizontal: 10, // Add horizontal margin to create spacing between columns
		textAlign: "left",
		fontSize: 13,
	},
	row: { height: 40 },
	rowGray: { backgroundColor: "#F8F9FA" }, // Light gray row
	rowWhite: { backgroundColor: "#FFFFFF" }, // White row
	boldText: {
		fontWeight: "bold",
		color: COLORS.darkText,
		textAlign: "left",
	},
});

export default TableComponent;
