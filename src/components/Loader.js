import React from 'react'

function withLoading(MyComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				data: ''
			}
		}

		// timeout() {
		// 	if (this.props.loading) {
		// 		for (let i = 0; i < 4; i++) {
		// 			setTimeout(() => {
		// 				this.setState({ data: this.state.data + '.' })
		// 			}, 300 * i)
		// 		}
		// 		setTimeout(() => {
		// 			this.setState({ data: '' })
		// 		}, 300 * 4)
		// 	}
		// }

		componentDidMount(){
			this.interval = setInterval(()=> {
				let newData;
				if (this.state.data.length > 3) {
					newData = ""
				} else {
					newData = this.state.data + "."
				}

				this.setState({
					data: newData
				})
			}, 500)
		}


		render() {
			if(!this.props.loading) {
				clearInterval(this.inteval)
			}

			return this.props.loading ? (
				<span>
					Loading {this.state.data}
				</span>
			) : (
				<MyComponent {...this.props} />
			)
		}
	}
}

export default withLoading
