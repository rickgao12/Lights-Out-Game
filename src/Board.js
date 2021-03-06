import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.5
	};

	constructor(props) {
		super(props);
		this.state = {
			board: this.createBoard(),
			hasWon: false
		};
		this.restart = this.restart.bind(this);
	
	}

	createBoard() {
		let board = [];

		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				row.push(Math.random() < this.props.chanceLightStartsOn);
			}
			board.push(row);
		}
		return board;
	}

	flipCellsAround(coord) {
		console.log(`flip ${coord}`);
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [ y, x ] = coord.split('-').map(Number);

		function flipCell(y, x) {

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}
		flipCell(y, x);
		flipCell(y + 1, x);
		flipCell(y - 1, x);
		flipCell(y, x + 1);
		flipCell(y, x - 1);

		let hasWon = board.every((row) => row.every((cell) => !cell));

		this.setState({ board: board, hasWon: hasWon });
	}


	restart() {
		this.setState(() => ({
			board: this.createBoard(),
			hasWon: false
		}));
	}

	render() {

		let tblBoard = [];
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						flipCellsAroundMe={this.flipCellsAround.bind(this, coord)}
						isLit={this.state.board[y][x]}
					/>
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
			<div>
				<div className="container">
					{this.state.hasWon ? (
						<div>
							<h1 className="Winner">You Won!</h1>
							<button className="restart-btn" onClick={this.restart}>
								{' '}
								Play again?
							</button>
						</div>
					) : (
						<div className="center">
							<h1 className="Board-title">Lights Out</h1>
							<table className="Board">
								<tbody>{tblBoard}</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Board;
