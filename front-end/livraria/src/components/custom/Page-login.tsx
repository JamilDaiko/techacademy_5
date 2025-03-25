import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Create Account</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="shadow-2xl p-8">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
            Already have an account? Log in below. If you don't have one yet, click the button next to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input id="Email" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="shadow-2xl p-8">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Fill in the details below to create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName"> Full Name</Label>
              <Input id="fullName" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Create Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
