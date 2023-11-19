package com.galvanize.crudSample.dao.implementation;

import com.galvanize.crudSample.dao.EmployeeDao;
import com.galvanize.crudSample.domain.Employee;
import com.galvanize.crudSample.exception.DataException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeDaoMapImpl implements EmployeeDao {

    Map<Long, Employee> inMemoryDatabase = new HashMap<>();

    public EmployeeDaoMapImpl() {
        Employee initializerEmployee = Employee.SAMPLE_EMPLOYEE;
        inMemoryDatabase.put(1L, initializerEmployee);
    }

    @Override
    public Employee getEmployee(long id) {
        return inMemoryDatabase.get(id);
    }

    @Override
    public List<Employee> getEmployeeByName(String name) {
        List <Employee> employeesWithThisName = new ArrayList<>();
        for( Employee currentEmployee: inMemoryDatabase.values() ) {
            if (name.equals(currentEmployee.getName()) ) {
                employeesWithThisName.add(currentEmployee);
            }
        }
        return employeesWithThisName;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return new ArrayList<>(inMemoryDatabase.values());
    }

    @Override
    public void updateEmployee(Employee e) throws DataException {
        if (inMemoryDatabase.get(e.getId()) == null) {
            throw new DataException("No employee to update");
        }
        inMemoryDatabase.put(e.getId(), e);
    }

    @Override
    public void deleteEmployee(Employee e) throws DataException {
        if (inMemoryDatabase.get(e.getId())==null) {
            throw new DataException("No employee to delete");
        }
        inMemoryDatabase.remove(e.getId());
    }

    @Override
    public void addEmployee(Employee e) throws DataException {
        if (inMemoryDatabase.get(e.getId()) != null) {
            throw new DataException("employee already exists");
        }
        inMemoryDatabase.put(e.getId(), e);
    }
}
