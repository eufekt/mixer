import History from "@/src/components/channelHistory/History"
import { withChannelHistoryContextMock } from "../mocks/contexts";
describe("History Component", () => {
    it("should show default mixer link", () => {
        let mockChannelHistory = {
            list: [
                { id: 1, url: '/channel1', title: 'mixer', status: 'public' },
            ],
        };

        const { getAllByTestId, getByText } = withChannelHistoryContextMock(History, mockChannelHistory)
        const channels = getAllByTestId("channel")
        expect(channels.length).toBe(1)
        const defaultChannel = channels[0]
        const targetText = getByText('mixer', { container: defaultChannel })
        expect(targetText).toBeInTheDocument();
    })
})



