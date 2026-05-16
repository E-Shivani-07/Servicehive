# Frontend UI Components Guide

Complete guide for using reusable UI components in the dashboard application.

## 📁 Component Structure

```
frontend/src/
├── components/
│   └── ui/              # Reusable UI components
│       ├── Alert.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── FormError.tsx
│       ├── Input.tsx
│       ├── LoadingOverlay.tsx
│       ├── Skeleton.tsx
│       ├── Spinner.tsx
│       └── index.ts     # Barrel export
├── lib/
│   ├── validation.ts    # Form validation utilities
│   ├── responsive.ts    # Responsive design utils
│   └── utils.ts
└── features/
    ├── auth/
    ├── leads/
    └── ...
```

## 🎨 Available Components

### 1. **Spinner** - Loading Indicator
A customizable loading spinner component.

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Spinner size (default: 'md')
- `color?: 'primary' | 'white' | 'muted'` - Color variant (default: 'primary')
- `className?: string` - Additional Tailwind classes

**Usage:**
```tsx
import { Spinner } from '@/components/ui';

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}
```

### 2. **Skeleton** - Loading Placeholder
Shows a placeholder while content is loading.

**Props:**
- `variant?: 'text' | 'circular' | 'rectangular'` - Shape (default: 'text')
- `count?: number` - Number of skeletons (default: 1)
- `height?: string` - Custom height (default: 'h-4')
- `className?: string` - Additional classes

**Usage:**
```tsx
import { Skeleton } from '@/components/ui';

export function SkeletonLoading() {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" count={3} />
      <Skeleton variant="rectangular" height="h-64" />
      <Skeleton variant="circular" />
    </div>
  );
}
```

### 3. **Alert** - Notifications
Dismissible alerts with multiple variants.

**Props:**
- `variant?: 'default' | 'destructive' | 'success' | 'warning'` - Alert type
- `onDismiss?: () => void` - Dismiss callback
- `title?: string` - Alert title
- `children` - Alert message content
- `className?: string` - Additional classes

**Variants:**
- `default` (blue) - ℹ️ Informational
- `destructive` (red) - ⚠️ Error
- `success` (green) - ✓ Success
- `warning` (orange) - ⚡ Warning

**Usage:**
```tsx
import { Alert } from '@/components/ui';
import { useState } from 'react';

export function AlertExample() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert
      variant="success"
      title="Success!"
      onDismiss={() => setShow(false)}
    >
      Your changes have been saved successfully.
    </Alert>
  );
}
```

### 4. **EmptyState** - No Data Display
Shows when there's no data to display.

**Props:**
- `icon?: ReactNode` - Icon/emoji to display
- `title: string` - Empty state title
- `description?: string` - Optional description
- `action?: { label: string; onClick: () => void }` - Optional action button
- `className?: string` - Additional classes

**Usage:**
```tsx
import { EmptyState } from '@/components/ui';

export function NoLeads() {
  return (
    <EmptyState
      icon="📋"
      title="No Leads Yet"
      description="Start by creating your first lead to get started."
      action={{
        label: 'Create Lead',
        onClick: () => window.location.href = '/leads/new'
      }}
    />
  );
}
```

### 5. **FormError** - Validation Errors
Displays form validation errors.

**Props:**
- `errors?: Record<string, string | string[]>` - Field errors
- `className?: string` - Additional classes

**Usage:**
```tsx
import { FormError } from '@/components/ui';

export function FormWithErrors() {
  const [errors, setErrors] = useState({
    email: 'Please enter a valid email',
    password: ['At least 8 characters', 'Must include uppercase letter']
  });

  return (
    <div>
      <FormError errors={errors} />
      {/* Form fields */}
    </div>
  );
}
```

### 6. **LoadingOverlay** - Full-Page Loading
Full-screen loading overlay for critical operations.

**Props:**
- `visible: boolean` - Show/hide overlay
- `message?: string` - Optional loading message
- `spinnerSize?: 'sm' | 'md' | 'lg'` - Spinner size

**Usage:**
```tsx
import { LoadingOverlay } from '@/components/ui';
import { useState } from 'react';

export function PageWithOverlay() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingOverlay visible={loading} message="Saving..." />
      <button onClick={() => setLoading(!loading)}>
        Toggle Loading
      </button>
    </>
  );
}
```

### 7. **Button** - Action Button
Reusable button component with variants.

**Props:**
- `variant?: 'default' | 'destructive' | 'outline' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `disabled?: boolean`
- `className?: string`
- `children` - Button text

**Usage:**
```tsx
import { Button } from '@/components/ui';

export function Buttons() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Primary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

### 8. **Input** - Text Input
Reusable input component with validation.

**Props:**
- `type?: string` - Input type (default: 'text')
- `placeholder?: string` - Placeholder text
- `error?: boolean` - Show error state
- `disabled?: boolean`
- `className?: string`
- Standard HTML input attributes

**Usage:**
```tsx
import { Input } from '@/components/ui';

export function InputExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  return (
    <Input
      type="email"
      placeholder="Enter email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={error}
      onBlur={() => setError(value === '')}
    />
  );
}
```

### 9. **Card** - Content Container
Reusable card component with sub-components.

**Props:**
- `className?: string` - Additional classes
- `children` - Card content

**Sub-components:**
- `CardHeader` - Card header section
- `CardTitle` - Card title
- `CardContent` - Card body

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  );
}
```

## 🔧 Validation Utilities

Form validation helpers for comprehensive input validation.

**Available Validators:**
- `required` - Field must have a value
- `minLength(length)` - Minimum string length
- `maxLength(length)` - Maximum string length
- `email` - Valid email format
- `phone` - Valid phone number
- `password` - Strong password (8+ chars, uppercase, lowercase, number)
- `url` - Valid URL format
- `match(fieldName)` - Compare with another field
- `custom(fn)` - Custom validation function

**Validation Functions:**
- `validateField(value, rules)` - Validate single field
- `validateForm(data, rules)` - Validate entire form
- `hasErrors(errors)` - Check if errors exist
- `getErrorMessages(errors)` - Extract error array

**Usage:**
```tsx
import { validateField, validateForm } from '@/lib/validation';
import { useState } from 'react';

const rules = {
  email: [{ type: 'required' }, { type: 'email' }],
  password: [
    { type: 'required' },
    { type: 'password' }
  ],
  confirmPassword: [
    { type: 'required' },
    { type: 'match', field: 'password' }
  ]
};

export function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    const fieldRules = rules[name as keyof typeof rules];
    const error = validateField(value, fieldRules);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate entire form
    const newErrors = validateForm(formData, rules);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      
      <Button type="submit">Login</Button>
    </form>
  );
}
```

## 📱 Responsive Utilities

Responsive design helpers for mobile-first development.

**Breakpoints:**
- `xs`: 320px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Pre-built Classes:**
```tsx
import { responsiveClass } from '@/lib/responsive';

// Container widths
responsiveClass.containerSm;   // w-full sm:w-96
responsiveClass.containerMd;   // w-full md:w-2xl
responsiveClass.containerLg;   // w-full lg:w-4xl

// Grid layouts
responsiveClass.gridCols;      // 1 → 2 → 3 → 4 columns
responsiveClass.gridColsHalf;  // 1 → 2 columns

// Spacing
responsiveClass.paddingResponsive;  // Responsive padding
responsiveClass.paddingResponsiveY; // Responsive vertical padding

// Typography
responsiveClass.textResponsive;     // Responsive font size

// Layout
responsiveClass.displayResponsive;  // Flex direction changes
```

**useResponsive Hook:**
```tsx
import { useResponsive } from '@/lib/responsive';

export function ResponsiveComponent() {
  const screen = useResponsive(); // Returns 'mobile' | 'tablet' | 'desktop'

  return (
    <div>
      {screen === 'mobile' && <MobileView />}
      {screen === 'tablet' && <TabletView />}
      {screen === 'desktop' && <DesktopView />}
    </div>
  );
}
```

## 🚀 Integration Examples

### Complete Lead Form with Validation
```tsx
import { Input, Button, FormError, Alert } from '@/components/ui';
import { validateForm } from '@/lib/validation';
import { useState } from 'react';

const leadRules = {
  name: [{ type: 'required' }],
  email: [{ type: 'required' }, { type: 'email' }],
  phone: [{ type: 'required' }, { type: 'phone' }],
  source: [{ type: 'required' }]
};

export function LeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', source: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm(formData, leadRules);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    // Submit to API
    console.log('Submitting:', formData);
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', source: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <Alert variant="success" title="Success!">
          Lead created successfully
        </Alert>
      )}
      
      <FormError errors={errors} />
      
      <Input
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      
      <Button type="submit">Create Lead</Button>
    </form>
  );
}
```

### List with Loading and Empty States
```tsx
import { Skeleton, EmptyState, Card } from '@/components/ui';
import { useEffect, useState } from 'react';

export function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leads
    fetchLeads().then(data => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" count={5} height="h-16" />;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No Leads"
        description="Create your first lead to get started"
      />
    );
  }

  return (
    <div className="space-y-4">
      {leads.map(lead => (
        <Card key={lead.id}>
          <div className="p-4">
            <h3 className="font-bold">{lead.name}</h3>
            <p className="text-gray-600">{lead.email}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

## ✅ Best Practices

1. **Always use Skeleton during loading** - Better UX than blank space
2. **Show EmptyState** - When list has no data
3. **Use FormError** - For form validation feedback
4. **Wrap imports** - Use barrel exports from `@/components/ui`
5. **Responsive first** - Use responsive classes and useResponsive hook
6. **Validate early** - Check fields on blur, submit on form submit
7. **Show feedback** - Use Alert for success/error messages
8. **LoadingOverlay** - For critical operations only (not every request)

## 📦 Import Pattern

```tsx
// ✅ Good - Use barrel exports
import { Button, Input, Alert, Spinner } from '@/components/ui';

// ❌ Avoid - Direct imports
import Button from '@/components/ui/Button';
```

## 🎯 Next Steps

1. Integrate these components into feature pages
2. Test responsive design across breakpoints
3. Connect LoadingOverlay to global loading state
4. Add more variants as needed
5. Create page-level error boundaries
