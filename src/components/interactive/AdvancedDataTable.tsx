
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  Plus,
  FileText,
  Table,
  BarChart
} from 'lucide-react';

interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'badge' | 'boolean' | 'actions';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableData {
  [key: string]: any;
}

interface AdvancedDataTableProps {
  title: string;
  columns: TableColumn[];
  data: TableData[];
  loading?: boolean;
  onRefresh?: () => void;
  onEdit?: (row: TableData) => void;
  onDelete?: (row: TableData) => void;
  onView?: (row: TableData) => void;
  onExport?: (format: 'csv' | 'xlsx' | 'json') => void;
  onBulkAction?: (action: string, selectedRows: TableData[]) => void;
  enableSelection?: boolean;
  enableFilters?: boolean;
  enableExport?: boolean;
  enableBulkActions?: boolean;
  pageSize?: number;
}

const AdvancedDataTable: React.FC<AdvancedDataTableProps> = ({
  title,
  columns,
  data,
  loading = false,
  onRefresh,
  onEdit,
  onDelete,
  onView,
  onExport,
  onBulkAction,
  enableSelection = true,
  enableFilters = true,
  enableExport = true,
  enableBulkActions = true,
  pageSize = 10
}) => {
  const [filteredData, setFilteredData] = useState<TableData[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.key))
  );
  const { toast } = useToast();

  // Filter and search logic
  useEffect(() => {
    let result = [...data];

    // Apply search
    if (searchQuery) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        result = result.filter(row => {
          const rowValue = row[key];
          if (typeof value === 'string') {
            return String(rowValue).toLowerCase().includes(value.toLowerCase());
          }
          return rowValue === value;
        });
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when data changes
  }, [data, searchQuery, sortConfig, filters]);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageData = getCurrentPageData();
      setSelectedRows(new Set(currentPageData.map(row => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleBulkAction = (action: string) => {
    const selectedData = data.filter(row => selectedRows.has(row.id));
    onBulkAction?.(action, selectedData);
    setSelectedRows(new Set());
    
    toast({
      title: "Bulk Action Completed",
      description: `Applied ${action} to ${selectedData.length} items.`,
    });
  };

  const renderCellContent = (column: TableColumn, value: any, row: TableData) => {
    if (column.render) {
      return column.render(value, row);
    }

    switch (column.type) {
      case 'badge':
        return <Badge variant={value === 'active' ? 'default' : 'secondary'}>{value}</Badge>;
      case 'boolean':
        return value ? '✓' : '✗';
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'actions':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && (
                <DropdownMenuItem onClick={() => onView(row)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(row)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(JSON.stringify(row))}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(row)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return String(value);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            )}
            
            {enableExport && onExport && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onExport('csv')}>
                    <FileText className="h-4 w-4 mr-2" />
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport('xlsx')}>
                    <Table className="h-4 w-4 mr-2" />
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport('json')}>
                    <BarChart className="h-4 w-4 mr-2" />
                    JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="p-2 font-semibold">Show Columns</div>
                {columns.map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.has(column.key)}
                    onCheckedChange={(checked) => {
                      const newVisible = new Set(visibleColumns);
                      if (checked) {
                        newVisible.add(column.key);
                      } else {
                        newVisible.delete(column.key);
                      }
                      setVisibleColumns(newVisible);
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {(enableFilters || enableBulkActions) && (
          <div className="flex items-center gap-4 mt-4">
            {enableFilters && (
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {columns.filter(col => col.filterable).map(column => (
                  <Select
                    key={column.key}
                    value={filters[column.key] || ''}
                    onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, [column.key]: value || undefined }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder={column.label} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      {Array.from(new Set(data.map(row => row[column.key])))
                        .filter(Boolean)
                        .map(value => (
                          <SelectItem key={String(value)} value={String(value)}>
                            {String(value)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            )}

            {enableBulkActions && selectedRows.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedRows.size} selected
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                      Archive Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('delete')}
                      className="text-destructive"
                    >
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {enableSelection && (
                    <th className="w-12 p-4">
                      <Checkbox
                        checked={selectedRows.size === getCurrentPageData().length && getCurrentPageData().length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {columns
                    .filter(col => visibleColumns.has(col.key))
                    .map(column => (
                      <th 
                        key={column.key} 
                        className={`p-4 text-left font-medium ${column.width || ''}`}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {column.sortable && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => handleSort(column.key)}
                            >
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((row, index) => (
                  <tr key={row.id || index} className="border-t hover:bg-muted/30">
                    {enableSelection && (
                      <td className="p-4">
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={(checked) => handleSelectRow(row.id, Boolean(checked))}
                        />
                      </td>
                    )}
                    {columns
                      .filter(col => visibleColumns.has(col.key))
                      .map(column => (
                        <td key={column.key} className="p-4">
                          {renderCellContent(column, row[column.key], row)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedDataTable;
