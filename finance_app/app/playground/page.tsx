import Trend from '@/components/trend'
import TransactionSummaryItem from '@/components/transaction-summary-item';
import Button from '@/components/button';
import Label from '@/components/label';
import Input from '@/components/input';
import Select from '@/components/select';
import Separator from '@/components/separator';
import Skeleton from '@/components/skeleton';

export const metadata = {
  title: "Playground"
}

export default function Page() {
  return (
    <main className="space-y-8 mb-44">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator />
        <div className="flex space-x-8">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expense" amount={12000} prevAmount={10000} />
          <Trend type="Investment" amount={7000} prevAmount={11100} />
          <Trend type="Saving" amount={500} prevAmount={950} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionSummaryItem</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionSummaryItem date="2024-05-01" amount={3500} />
          <Separator />
          <TransactionSummaryItem date="2024-05-02" amount={1200} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Your name</Label>
            <Input type="text" placeholder="Type something in here..." />
          </div>

          <div>
            <Label className="mb-1">City</Label>
            <Select>
              <option>Warsaw</option>
              <option>Berlin</option>
              <option>London</option>
            </Select>
          </div>

          <div className="flex items-center">
            <Input type="checkbox" id="terms" />
            <Label className="ml-2" htmlFor="terms">Accept terms</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Separator />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </main>
  )
}