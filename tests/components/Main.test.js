import { useSession } from "next-auth/react"
import Main from "@/src/components/Main"
import { render } from "@testing-library/react"
jest.mock('next-auth/react')

describe('Main', () => {
    it('should show loading when user session loading', () => {
        useSession.mockReturnValue({ status: 'loading', data: null })
        const { getByText } = render(<Main>ChildComponent</Main>)
        expect(getByText('loading session')).toBeInTheDocument()
    })
    it('should show child component when session loaded', () => {
        useSession.mockReturnValue({ status: 'authenticated', data: { user: { name: 'test' } } })
        const { getByText } = render(<Main>ChildComponent</Main>)
        expect(getByText('ChildComponent')).toBeInTheDocument()
    })
})
