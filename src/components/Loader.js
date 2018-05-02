import React from 'react'

function withLoading(MyComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				data: ''
			}
		}

		timeout() {
			if (this.props.loading) {
				// console.log(this.state.data)
				for (let i = 0; i < 4; i++) {
          // console.log(i);
					setTimeout(() => {
						this.setState({ data: this.state.data + '.' })
					}, 300 * i)
				}
				setTimeout(() => {
					this.setState({ data: '' })
				}, 300 * 4)
			}
		}

		render() {
			// console.log(this.state.data)
			return this.props.loading ? (
				<span>
					Loading {this.state.data === '' ? this.timeout() : this.state.data}
				</span>
			) : (
				<MyComponent {...this.props} />
			)
		}
	}
}

export default withLoading
