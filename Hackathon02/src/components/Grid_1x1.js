import "./Grid.css"
import React, { Component } from "react";
//TODO

// Useful hints:
// for React Component:

// const gridStyle = {
//     color: (this.props.selectedGrid.row_index === this.props.row_index && this.props.selectedGrid.col_index === this.props.col_index) || this.props.conflicted ? "#FFF" : this.props.fixed ? "#666" : "#6CC",
//     backgroundColor: this.props.selectedGrid.row_index === this.props.row_index && this.props.selectedGrid.col_index === this.props.col_index ? "#333" : this.props.conflicted ? "#E77" : "#FFF",
// };
// class Grid_1x1 extends Component { 
    
//     constructor(props) { 
//         super(props);
//         this.state = {
//             value: 0,
//             fixed: 0,
//             row_index
//         }
//     }

//     render() {
//         const { value, fixed, row_index, col_index, handle_grid_1x1_click, selectedGrid, conflicted } = this.props;
//         return (
//             <div className="grid_1x1" id={`grid-${this.props.row_index}*${this.props.col_index}`} tabindex="1" style={gridStyle} onClick={() => this.props.handle_grid_1x1_click(this.props.row_index, this.props.col_index)}>
//                 { this.props.value === "0" ? "" : this.props.value}
//             </div>
//         );
//     }
// }
// for React Hook:




function Grid_1x1(props) {
    const gridStyle = {
        color: (props.selectedGrid.row_index === props.row_index && props.selectedGrid.col_index === props.col_index) || props.conflicted ? "#FFF" : props.fixed ? "#666" : "#6CC",
        backgroundColor: props.selectedGrid.row_index === props.row_index && props.selectedGrid.col_index === props.col_index ? "#333" : props.conflicted ? "#E77" : "#FFF",
        borderTop: props.col_index === 0 ? "1.5px solid transparent" : "1.5px solid #999",
        borderBottom: props.row_index === 2 ? "1.5px solid transparent" : "1.5px solid #999",
        borderLeft: props.col_index === 0 ? "1.5px solid transparent" : "1.5px solid #999",
        borderRight: props.col_index === 2 ? "1.5px solid transparent" : "1.5px solid #999",
    };
    
    return (
        <div className="grid_1x1" id={`grid-${props.row_index}*${props.col_index}`} tabindex="1" style={gridStyle} onClick={() => props.handle_grid_1x1_click(props.row_index, props.col_index)}>
            { props.value === "0" ? "" : props.value}
        </div>
    );
}
export default Grid_1x1;