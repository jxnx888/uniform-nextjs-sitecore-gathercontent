import { render, screen, cleanup } from '@testing-library/react'
import Index from './index'

afterEach(cleanup);

describe('Sample Test', () => {
  it('renders a Title', () => {
    // @ts-ignore
    render(<Index title={'Hero'} image={'/images/logo.png'} />)

    const Title = screen.getByText(/Hero/i)

    // @ts-ignore
    expect(Title).toBeInTheDocument()
  })
  test('alt contains correct value', () => {
    const path = '/images/logo.png'
    // @ts-ignore
    render(<Index title={'Hero'} image={path} />)

    const testImage = document.querySelector("img") as HTMLImageElement;
    // @ts-ignore
    expect(testImage.src).toContain(path);
  })
})